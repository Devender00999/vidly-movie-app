

const Like = (props) => {
    const classes = props.movie.liked ? "fa fa-heart" : "fa fa-heart-o";
    return (
    <i
      id={props.id}
      onClick={() => props.onLiked(props.movie)}
      className={classes}
      style={{cursor:"pointer"}}
    ></i>
  );
};
export default Like;
