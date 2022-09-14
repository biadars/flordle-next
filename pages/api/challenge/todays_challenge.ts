import {NextApiRequest, NextApiResponse} from 'next';
import {ChallengeRepository} from '../../../backend/repositories/challenge_repository';
import {logger} from '../../../backend/utils/logger';

export const todays_challenge = (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise((resolve, reject) => {
        const challengeRepository = new ChallengeRepository();
        return challengeRepository.ensureChallengeExistsForToday()
            .then((challenge) => {
                logger.info('Returning challenge ', challenge);
                res.statusCode = challenge !== null ? 200 : 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(challenge));
                resolve(res);
            })
            .catch((err) => {
                logger.error('Something went wrong fetching today\'s challenge: ', err);
                res.status(500);
                reject();
            });
    });
};

export default todays_challenge;