import requests
import sys
import json

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
        raw_price = self.data["Global Quote"]["05. price"]
        money = raw_price.split(".")
        dollars = money[0]
        cents = money[1][:2]
        print("Price of " + self.ticker + ": $" + dollars + "." + cents)


g = Grab(
    "GDJIXVNNXQGHSD7A",
    sys.argv[1]
)
