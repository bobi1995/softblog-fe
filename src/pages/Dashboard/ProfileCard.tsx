import React from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Card,
} from "@mui/material";

const dummyData = {
  description:
    "Тук въведи кратко ревю за себе си. Ревюто например може да включва най-важната информация за теб, която твоите читатели биха искали да знаят, както и технологиите, с които работиш.",
  name: "Твоето име",
};

//Usual content without option to edit
const NormalContent = ({
  description,
  name,
}: {
  description: string;
  name: string;
}) => (
  <CardContent>
    <Typography
      gutterBottom
      variant="h5"
      component="div"
      style={{ textAlign: "center" }}
    >
      {name ? name : dummyData.name}
    </Typography>
    <Typography
      variant="body2"
      color="text.secondary"
      style={{ textAlign: "center", fontStyle: "italic" }}
    >
      {description ? description : dummyData.description}{" "}
    </Typography>
  </CardContent>
);

//Content of the card when EDIT is pressed
const EditContent = ({
  description,
  name,
}: {
  description: string;
  name: string;
}) => (
  <CardContent>
    <TextField
      style={{ width: "100%" }}
      variant="outlined"
      placeholder="Въведи твоето име..."
    >
      {name ? name : ""}
    </TextField>
    <TextField
      variant="outlined"
      placeholder="Въведи твоето резюме..."
      style={{
        width: "100%",
      }}
      multiline
      rows={3}
    >
      {description ? description : ""}
    </TextField>
  </CardContent>
);

const ProfileCard = ({ data }: { data: any }) => {
  const [edit, setEdit] = React.useState(false);
  return (
    <Card sx={{ maxWidth: 345, marginTop: 5 }} elevation={10}>
      <CardMedia
        component="img"
        alt="Аватар"
        image={data.photoURL}
        style={{
          width: 100,
          borderRadius: 50,
          margin: "0 auto",
          marginTop: 10,
        }}
      />

      {edit ? (
        <EditContent description={data.description} name={data.name} />
      ) : (
        <NormalContent description={data.description} name={data.name} />
      )}
      <CardActions style={{ justifyContent: "center" }}>
        <Button size="small">Запази</Button>
        <Button size="small" onClick={() => setEdit(!edit)}>
          {edit ? "Откажи се" : "Редактирай"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProfileCard;
