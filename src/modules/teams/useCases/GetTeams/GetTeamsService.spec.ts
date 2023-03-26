import { FakeUserRepository } from "../../../accounts/infra/prisma/repositories/fakes/FakeUserRepository";
import { FakeTeamRepository } from "../../infra/prisma/repositories/fakes/fakeTeamRepository";
import { GetTeamsService } from "./GetTeamsService";

  describe('GetTeamsService', () => {
    let service: GetTeamsService;
    let teamRepository: FakeTeamRepository;
    let userRepository: FakeUserRepository;
  
    beforeEach(() => {
      teamRepository = new FakeTeamRepository();
      userRepository = new FakeUserRepository();
      service = new GetTeamsService(teamRepository, userRepository);

      userRepository.create({
        id: '2',
        name: 'Thiago Doe',
        email: 'thiago@gmail.com',
        loginMode: {
            type: 'google',
            userId: '2',
            password: '123456'
        },
        iPlayIn: [],
        })

      teamRepository.create({
        id: '1',
        name: 'Team A',
        ownerId: '2',
      })
    });
    
  
    it('should return all teams that user plays in and owns', async () => {
      const ownerId = '2';
      const expectedTeams = [
        {id: '1', name: 'Team A', ownerId: '2'},
      ];
  
      const result = await service.execute({ownerId});
      expect(result).toEqual(expectedTeams);
    });
  });