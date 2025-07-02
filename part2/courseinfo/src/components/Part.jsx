const Part = ({part}) => (
  <p key={part.id} >
    {part.name} {part.exercises}
  </p>
)

export default Part