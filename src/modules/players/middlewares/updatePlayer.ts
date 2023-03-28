import { AppError } from "../../../shared/errors/AppError";

export function validatePlayerUpdate(req, res, next) {
    const { name, position } = req.body;
    if (!position || !name) {
      throw new AppError("Preencha todos os campos obrigatórios", 400)
    }

    if(position) {
        if (position.length < 3) {
            throw new AppError("A senha deve ter no mínimo 3 caracteres", 400)
        }
        if(position.length > 30) {
            throw new AppError("A posição deve ter no máximo 30 caracteres", 400)
        }
    }

    if(name) {
        if(name.length < 2) {
            throw new AppError("O nome deve ter no mínimo 2 caracteres", 400)
        }
    
        if(name.length > 50) {
            throw new AppError("O nome deve ter no máximo 50 caracteres", 400)
        }
    }
    next();
  }