from flask import Flask, render_template, request, jsonify

app = Flask(name)

tasks = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.get_json()
    task = data.get("task")
    if task:
        tasks.append(task)
    return jsonify({"status": "ok"})

@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    if 0 <= task_id < len(tasks):
        tasks.pop(task_id)
    return jsonify({"status": "deleted"})

if name == "main":
    app.run(debug=True)
