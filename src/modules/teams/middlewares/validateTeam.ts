import { AppError } from "../../../shared/errors/AppError";

export function validateTeam(req, res, next) {
    const { ownerId, imgUrl, name } = req.body;
    if (!ownerId || !name) {
      throw new AppError("Preencha todos os campos obrigatórios", 400)
    }

    if(name.length < 2) {
        throw new AppError("O nome deve ter no mínimo 2 caracteres", 400)
    }

    if(name.length > 50) {
        throw new AppError("O nome deve ter no máximo 50 caracteres", 400)
    }
    next();
  }