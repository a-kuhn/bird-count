const checklistController = require("../controllers/checklist.controller");

module.exports = app => {
  //create new checklist
  app.post("/api/checklists/new", checklistController.create);
  //get one checklist  /api/checklists/:id
  app.get("/api/checklists/:id", checklistController.getOne);
  //update checklist  /api/checklists/update/:id
  app.put("/api/checklists/:id", checklistController.update);
  //delete checklist  /api/checklists/delete/:id
  app.delete("/api/checklists/:id", checklistController.delete);
}