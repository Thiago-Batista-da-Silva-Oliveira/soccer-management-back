import { AppError } from "../../../../shared/errors/AppError";
import { Team } from "../..";
import { FakeTeamRepository } from "../../infra/prisma/repositories/fakes/fakeTeamRepository";
import { CreateTeamService } from "./CreateTeamService";

describe("CreateTeamService", () => {
  let createTeamService: CreateTeamService;
  let teamRepository: FakeTeamRepository;

  beforeEach(() => {
    teamRepository = new FakeTeamRepository();
    createTeamService = new CreateTeamService(teamRepository);
  });

  it("should create a team", async () => {
    const teamData = {
      name: "My Team",
      imgUrl: "http://example.com/image.jpg",
      ownerId: "123",
    };

    // Verifica que o time não existe antes de criar
    const existingTeam = await teamRepository.checkIfAlreadyExists(
      teamData.name,
      teamData.ownerId
    );
    expect(existingTeam).toBe(false);

    const result = await createTeamService.execute(teamData);

    // Verifica se o time foi criado corretamente
    expect(result).toBeInstanceOf(Team);
    expect(result.name).toBe(teamData.name);
    expect(result.imgUrl).toBe(teamData.imgUrl);
    expect(result.ownerId).toBe(teamData.ownerId);

    // Verifica que o time agora existe após criar
    const existingTeamAfterCreate = await teamRepository.checkIfAlreadyExists(
      teamData.name,
      teamData.ownerId
    );
    expect(existingTeamAfterCreate).toBe(true);
  });

  it("should throw an error if the team already exists", async () => {
    const teamData = {
      name: "My Team",
      imgUrl: "http://example.com/image.jpg",
      ownerId: "123",
    };

    // Cria um time com os mesmos dados antes de tentar criar novamente
    const existingTeam = Team.create({
      name: teamData.name,
      imgUrl: teamData.imgUrl,
      ownerId: teamData.ownerId,
    });
    await teamRepository.create(existingTeam);

    await expect(createTeamService.execute(teamData)).rejects.toBeInstanceOf(AppError)
  });
});