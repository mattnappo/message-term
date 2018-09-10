import requests
import sys
import json
from os import system as bash

class Grab:
    def __init__(self, api_key, message, number):
        self.data = None
        self.ticker = ""

        self.api_key = api_key
        self.message = message
        self.number = number

        self.handle()
        
    def handle(self):
        words = self.message.lower().split(" ")
        if words[0] == "price":
            self.ticker = words[1]

        self.get_current_price()

    def get_current_price(self):
        request = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + self.ticker + "&apikey=" + self.api_key
        self.data = requests.get(request)
        self.data = self.data.json()
        self.parse()

    def parse(self):
        if self.data["Global Quote"] != {}:
            self.ticker = self.ticker.upper()
            raw_price = self.data["Global Quote"]["05. price"]
            money = raw_price[:-2]
            price = "Price of " + self.ticker + ": \$" + money
            bash("~/.msgterm/message_term --send " + self.number + " '" + price + "'")
        else:
            bash("~/.msgterm/message_term --send " + self.number + " \"Oops. It looks like the ticker '" + self.ticker.upper() + "' is invalid!\"")

with open("./SUCCESS", "w") as f:
    f.write("SUCCESS")

Grab(
    "GDJIXVNNXQGHSD7A",
    sys.argv[1],
    "9144142874"
)
