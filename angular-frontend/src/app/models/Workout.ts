import Exercise from '../models/Exercise'

export default interface Workout {
    name: String,
    exercises: [Exercise]
}