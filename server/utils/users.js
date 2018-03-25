// addUser(id, name, room)

// removeUser(id)

// getUser(id)

// getUserList(room)


class Users {
    constructor () {
        this.users = [];
    }
    
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    
    removeUser (id) {
        var user = this.getUser(id);
        
        if (user){
            this.users = this.users.filter((user) => user.id !== id);
        }
        
        return user;
        
    }
    
    getUser (id) {
        
        return this.users.filter((user)=> user.id === id)[0];
    }
    
    getUserList (room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user)=> user.name);
        
        return namesArray;
    }
}

module.exports = {Users};

//var friends = new Users();
//console.log('Just created ', friends);
//
//friends.addUser('1','Mike','Phil Room');
//friends.addUser('2','Tom','Phil Room');
//friends.addUser('3','Stacy','Phil Room');
//friends.addUser('4','Rachel','Phil Room');
//
//console.log('Added Mike', friends.getUser(1));
//
//console.log(friends.removeUser('2'));







//class Person {
//    constructor (name, age) {
//       this.name = name;
//        this.age = age;
//    }
//    
//    getUserDescription() {
//        return `${this.name} is ${this.age} year(s) old.`;
//    }
//};
//
//var me = new Person('Lisa',28);
//
//console.log(me.getUserDescription());