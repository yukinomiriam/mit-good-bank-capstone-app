import Card from "./Card";
function Home() {
  return (
    <div id="home" className="home-background">
      <div className="right">
        <Card
          className="card mb-3"
          maxWidth="26rem"
          txtcolor="black"
          header="BadBank"
          title="Welcome to BadBank"
          text="You're Not Just Another Customer. We're Not Just Another Bank."
          body={
            <img src="bad-bank-3d-logo.png" className="img-fluid" alt="Logo" />
          }
        />
      </div>
    </div>
  );
}

export default Home;
