import { useState } from "react";

const ExpandableItem = (props) => {
  const [open, setOpen] = useState(false);

  return props.render({ open, setOpen });
};

export default ExpandableItem;
