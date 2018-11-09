var mongoose = require("mongoose");
//var Employee = require('../models/Employee');
var Employee = mongoose.model("Employee", require('../models/Employee.js')); //Add model require
var employeeController = {}; //Create controller object for CRUD operations

//Add show list of employees function
employeeController.list = function(req, res) {
    Employee.find({}).exec(function (err, employees) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/employees/index", {employees: employees});
      }
    });
};

//Add show single employee by id function
employeeController.show = function(req, res) {
    Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/employees/show", {employee: employee});
      }
    });
};

//Add create employee function, it just redirects to create the page
employeeController.create = function(req, res) {
    res.render("../views/employees/create");
};

//Add save new employee function
employeeController.save = function(req, res) {
    var employee = new Employee(req.body);
  
    employee.save(function(err) {
      if(err) {
        console.log(err);
        res.render("../views/employees/create");
      } else {
        console.log("Successfully created an employee.");
        res.redirect("/employees/show/"+employee._id);
      }
    });
};

//Add edit employee by id function, it just redirects to edit page
employeeController.edit = function(req, res) {
    Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/employees/edit", {employee: employee});
      }
    });
};

//Add update employee function for updating currently edited employee.
employeeController.update = function(req, res) {
    Employee.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, employee) {
      if (err) {
        console.log(err);
        res.render("../views/employees/edit", {employee: req.body});
      }
      res.redirect("/employees/show/"+employee._id);
    });
};

//Add delete employee by id function for remove single employee data.
employeeController.delete = function(req, res) {
    Employee.remove({_id: req.params.id}, function(err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("Employee deleted!");
        res.redirect("/employees");
      }
    });
};

module.exports = employeeController;