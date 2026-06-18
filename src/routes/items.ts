import { Router } from "express";
import { ItemController } from "../controllers/itemController";
import { ItemService } from "../services/itemsService";
import { ItemRepository } from "../repositories/itemsModel";

const itemsRouter = Router();

const repository = new ItemRepository();
const service = new ItemService(repository);
const controller = new ItemController(service);

itemsRouter.get("/", (req, res, next) => controller.findAll(req, res, next));
itemsRouter.get("/:id", (req, res, next) => controller.findById(req, res, next));
itemsRouter.post("/", (req, res, next) => controller.create(req, res, next));
itemsRouter.put("/:id", (req, res, next) => controller.update(req, res, next));
itemsRouter.delete("/:id", (req, res, next) => controller.remove(req, res, next));
itemsRouter.patch("/check-all", (req, res, next) => controller.checkAll(req, res, next));

export { itemsRouter };
