import { AppError } from "../../../shared/errors/AppError";

export function validateTransaction(req, res, next) {
    const { amount, description, teamId, type} = req.body;
    if (!amount || !description || !type || !teamId) {
      throw new AppError("Preencha todos os campos obrigatórios", 400)
    }

    if(typeof amount !== "number") {
        throw new AppError("O valor deve ser um número", 400)
    }

    if (description.length < 3) {
        throw new AppError("A senha deve ter no mínimo 3 caracteres", 400)
    }
    if(description.length > 100) {
        throw new AppError("A posição deve ter no máximo 100 caracteres", 400)
    }

    if(type !== "contribution" && type !== "expense") {
        throw new AppError("O tipo deve ser contribuição ou despesa", 400)
    }
    next();
  }