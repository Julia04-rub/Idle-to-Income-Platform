from flask import Flask, request, jsonify, send_from_directory
import sqlite3
import uuid

from flask_cors import CORS

app = Flask(__name__, static_folder="static", static_url_path="")
CORS(app)

tokens = {}


def init_db():
    conn = sqlite3.connect("database.db")
    c = conn.cursor()

    c.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
    )
    """)

    c.execute("""
    CREATE TABLE IF NOT EXISTS tasks(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        reward INTEGER
    )
    """)

    c.execute("""
    CREATE TABLE IF NOT EXISTS earnings(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task_id INTEGER,
        reward INTEGER
    )
    """)

    c.execute("SELECT COUNT(*) FROM tasks")
    count = c.fetchone()[0]

    if count == 0:
        tasks = [
            ("Data Entry Task","Enter customer data into spreadsheet",5),
            ("Social Media Design","Design a simple Instagram post",8),
            ("Translate Document","Translate a 1 page document",6),
            ("Community Survey","Collect 10 survey responses",4)
        ]

        c.executemany(
            "INSERT INTO tasks(title,description,reward) VALUES(?,?,?)",
            tasks
        )

    conn.commit()
    conn.close()


init_db()


def get_user():

    auth = request.headers.get("Authorization")

    if not auth:
        return None

    try:
        token = auth.split(" ")[1]
        return tokens.get(token)
    except:
        return None
    
@app.route("/")
def home():
    return app.send_static_file("login.html")


@app.route("/register", methods=["POST"])
def register():

    data = request.json

    conn = sqlite3.connect("database.db")
    c = conn.cursor()

    c.execute(
        "INSERT INTO users(username,password) VALUES(?,?)",
        (data["username"],data["password"])
    )

    conn.commit()
    conn.close()

    return {"message":"User created"}


@app.route("/login", methods=["POST"])
def login():

    data = request.json

    conn = sqlite3.connect("database.db")
    c = conn.cursor()

    c.execute(
        "SELECT * FROM users WHERE username=? AND password=?",
        (data["username"],data["password"])
    )

    user = c.fetchone()

    if user:
        token = str(uuid.uuid4())
        tokens[token] = user[0]
        return {"token":token}

    return {"error":"Invalid login"},401


@app.route("/tasks")
def tasks():

    user_id = get_user()

    if not user_id:
        return {"error":"Unauthorized"},401

    conn = sqlite3.connect("database.db")
    c = conn.cursor()

    c.execute("SELECT * FROM tasks")

    rows = c.fetchall()

    data=[]

    for r in rows:
        data.append({
            "id":r[0],
            "title":r[1],
            "description":r[2],
            "reward":r[3]
        })

    conn.close()

    return jsonify(data)


@app.route("/accept/<int:task_id>", methods=["POST"])
def accept(task_id):

    user_id = get_user()

    if not user_id:
        return {"error":"Unauthorized"},401

    conn = sqlite3.connect("database.db")
    c = conn.cursor()

    c.execute("SELECT reward FROM tasks WHERE id=?", (task_id,))
    reward = c.fetchone()

    if not reward:
        return {"error":"Task not found"},404

    reward = reward[0]

    c.execute(
        "INSERT INTO earnings(user_id,task_id,reward) VALUES(?,?,?)",
        (user_id,task_id,reward)
    )

    conn.commit()
    conn.close()

    return {"message":"Task accepted"}


@app.route("/earnings")
def earnings():

    user_id = get_user()

    if not user_id:
        return {"error":"Unauthorized"},401

    conn = sqlite3.connect("database.db")
    c = conn.cursor()

    c.execute("""
        SELECT tasks.title, earnings.reward
        FROM earnings
        JOIN tasks ON earnings.task_id = tasks.id
        WHERE earnings.user_id=?
    """,(user_id,))

    rows = c.fetchall()

    data=[]

    for r in rows:
        data.append({
            "title":r[0],
            "reward":r[1]
        })

    conn.close()

    return jsonify(data)


if __name__ == "__main__":
     app.run()