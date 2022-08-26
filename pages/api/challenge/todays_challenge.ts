import {NextApiRequest, NextApiResponse} from 'next';
import {ChallengeRepository} from '../../../repositories/challenge_repository';

export const todays_challenge = (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise((resolve, reject) => {
        const challengeRepository = new ChallengeRepository();
        return challengeRepository.ensureChallengeExistsForToday()
            .then((challenge) => {
                console.log('Returning challenge ', challenge);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(challenge));
                resolve(res);
            })
            .catch((err) => {
                console.log('Something went wrong fetching today\'s challenge! ', err);
                res.status(500);
                reject();
            });
    });
};

export default todays_challenge;