"""
Provides html ui
"""
from flask import Flask,render_template, request,json
from RPi import GPIO


app = Flask(__name__, template_folder='content')

@app.route('/')
def index():
    """
    Handle index page
    """
    return render_template('index.html')


@app.route('/pin', methods=['PUT'])
def toggle():
    """
    Toggle pin status
    """
    pin =  request.form['pin']
    state = request.form['state']

    try:
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(int(pin), GPIO.OUT)

        if state == "HIGH":
            GPIO.output(int(pin), GPIO.HIGH)
            new_state = "HIGH"
        if state == "LOW":
            GPIO.output(int(pin), GPIO.LOW)
            new_state = "LOW"
    finally:
        print(f"pin {pin} updated to state {state}")

    return json.dumps({'status':'OK','pin':pin,'state':new_state})

@app.route('/pin/<pin>', methods=['GET'])
def status(pin):
    """
    Retrieve pin status
    """
    try:
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(int(pin), GPIO.OUT)

        is_on = GPIO.input(int(pin))
    finally:
        print(f"pin {pin} state returned")

    return json.dumps({'status':'OK','pin':pin,'state': "HIGH" if is_on else "LOW" })


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
