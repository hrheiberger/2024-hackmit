'''
List of all objects
'''
class entity:
    def __init__(self, name):
        self.name = name
        self.connections = set()

class company(entity): 
    def __init__(self, ticker, historical):
        self.name = ticker
        self.connections = set()
        self.historical = historical #Historical price data for stock

class business_person(entity): 
    def __init__(self, name):
        super().__init__(name)

class country(entity): 
    def __init__(self, name):
        super().__init__(name)

class connection():
    def __init__(self, start, end, relation):
        self.start = start
        self.end = end
        self.relation = relation #i.e. type of connection