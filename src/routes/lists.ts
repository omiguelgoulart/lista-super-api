import { Router } from "express";
import { ListController } from "../controllers/listController";
import { ListService } from "../services/listService";
import { ListRepository } from "../repositories/listRepository";

const listsRouter = Router();

const repository = new ListRepository();
const service = new ListService(repository);
const controller = new ListController(service);

listsRouter.get("/", (req, res, next) => controller.findAll(req, res, next));
listsRouter.get("/:id", (req, res, next) => controller.findById(req, res, next));
listsRouter.post("/", (req, res, next) => controller.create(req, res, next));
listsRouter.put("/:id", (req, res, next) => controller.update(req, res, next));
listsRouter.delete("/:id", (req, res, next) => controller.remove(req, res, next));
listsRouter.post("/:id/duplicate", (req, res, next) => controller.duplicate(req, res, next));
listsRouter.delete("/:id/checked", (req, res, next) => controller.clearChecked(req, res, next));

export { listsRouter };
