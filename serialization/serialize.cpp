#include <ostream>
#include <string>

using namespace std;
class Person {

public:
    Person(string _name, string _height) {
        string name = _name;
        string height = _height;
    }
    ostream& serialize(ostream &out) const {
        out << height;
        out << ',' //number seperator
        out << width;
        out << ',' //number seperator
        out << name.size(); //serialize size of string
        out << ',' //number seperator
        out << name; //serialize characters of string
        return out;
    }
    istream& deserialize(istream &in) {
        if (in) {
            int len=0;
            char comma;
            in >> height;
            in >> comma; //read in the seperator
            in >> width;
            in >> comma; //read in the seperator
            in >> len;  //deserialize size of string
            in >> comma; //read in the seperator
            if (in && len) {
                vector<char> tmp(len);
                in.read(tmp.data() , len); //deserialize characters of string
                name.assign(tmp.data(), len);
            }
        }
        return in;
    }
};
