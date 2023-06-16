from flask import Flask, g
from flask_restful import Resource, Api
import sqlite3

app = Flask(__name__)
api = Api(app)
TEST_FORECAST_DATABASE = './Databases/test_forecast.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(TEST_FORECAST_DATABASE)
    db.row_factory = make_dicts
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def make_dicts(cursor, row):
    return dict((cursor.description[idx][0], value)
                for idx, value in enumerate(row))

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


class TestForecastGetAll(Resource):
    
    def get_all_forecast(self):
        return query_db("select * from test_forecast")

    def get(self):
        fc = self.get_all_forecast()
        return fc
    
    
class TestForecastGetAtTime(Resource):
    def get_forecast_at_time(self, time):
        forecast = query_db("select * from test_forecast WHERE time = ?", [time], one=True)
        if forecast == None:
            print('Ne postoji trazeno vreme')
            return None
        return forecast
    
    def get(self, time):
        fc = self.get_forecast_at_time(time)
        return fc
    
class TestForecastGet7Days(Resource):
    def get_forecast_for_7_days(self, date):
        forecast = query_db("SELECT * FROM test_forecast WHERE date(time) >= ? LIMIT 24*7", [date])
        if forecast == None:
            print('Ne postoji trazeno vreme')
            return None
        return forecast
    
    def get(self, date):
        fc = self.get_forecast_for_7_days(date)
        return fc

api.add_resource(TestForecastGetAll, '/test_forecast', '/test_forecast/')
api.add_resource(TestForecastGetAtTime, '/test_forecast/<string:time>')
api.add_resource(TestForecastGet7Days, '/test_forecast/7_dana/<string:date>')

if __name__ == '__main__':
    app.run(debug=None)
