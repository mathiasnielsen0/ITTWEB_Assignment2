import Exercise from '../models/Exercise'

export default class Workout {
    _id: string;
    name: String;
    exercises: [Exercise]
}