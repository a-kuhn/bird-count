
const checklistController = require("../controllers/checklist.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = app => {
//create new checklist
  app.post("/api/checklists/new", authenticate, checklistController.create);

//get one checklist  /api/checklists/:id
  app.get("/api/checklists/:id", authenticate, checklistController.getOne);

//update checklist  /api/checklists/update/:id
  app.put("/api/checklists/:id", authenticate, checklistController.update);
  
//delete checklist  /api/checklists/delete/:id
  app.delete("/api/checklists/:id", authenticate, checklistController.delete);
}