# Gym

App structure:

- App
  - Navbar
  - Home
    - HeroBanner
    - SearchExercises
      - (Search bar)
      - HorizontalScrollBar
        - => BodyPart
    - Exercises
      - ExerciseCard
      - Pagination
  - ExerciseDetail
    - Detail
    - ExerciseVideos
    - SimilarExercises
      - HorizontalScrollBar
        - => ExerciseCard

The use of `useEffect`:

- SearchExercises
  - On load, fetch all body parts
- Exercises
  - Whenever `bodyPart` changes, fetch exercises of that `bodyPart`.
- ExerciseDetail
  - Whenever `id` changes, fetch the detail, youtube video, exercise with the same muscle group/equipment.
