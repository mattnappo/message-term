import requests
import sys
import json
from os import system as bash

class Grab:
    def __init__(self, key, ticker):
        self.data = None        
        self.key = key
        self.ticker = ticker
        self.get_current_price()
        
    def get_current_price(self):
        request = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + self.ticker + "&apikey=" + self.key
        self.data = requests.get(request)
        self.data = self.data.json()
        self.parse()

    def parse(self):
        if self.data["Global Quote"] != None:
            raw_price = self.data["Global Quote"]["05. price"]
            money = raw_price[:-2]
            price = "Price of " + self.ticker + ": \$" + money
            bash("~/.msgterm/message_term --send 9144142874 '" + price + "'")

g = Grab(
    "GDJIXVNNXQGHSD7A",
    sys.argv[1]
)
