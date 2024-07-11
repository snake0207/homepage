export const FetchImage = (props) => {
  const { fetchPriority, ...rest} = props;
  return (<img {...rest} />)
}