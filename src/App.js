
import React,{useEffect,useState} from 'react';
import {Button,Row,Col,Container,Form,Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector,useDispatch} from 'react-redux';
import {setMovies,addMovie} from './actions';


function App() {

const [__name, setName]         = useState("");
const [__rating, setRating]     = useState("");
const [__duration, setDuration] = useState("");
const [error, setError]         = useState("");
const [search, setSearch]       = useState("");



 const movieList = useSelector(state => state.list.movielist);
 const dispatch = useDispatch();

const resetInputField = () => {
    setName("");
    setRating("");
    setDuration("");
  };

const getMovies = async(item) =>{
     try {
     await fetch(process.env.REACT_APP_API_URL+'/searchMovies', {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
     },
      body: JSON.stringify({
          search    : item,
     }),
     }).then((response) => response.json())
    .then((responseJson) => {
          dispatch(setMovies(responseJson));
          resetInputField()
    })
    .catch((error) => {
          console.log(error);
    });
    } catch (error) {
       console.log(error);
    }     
 }

 const addMovies = async() =>{
     try {
     await fetch(process.env.REACT_APP_API_URL+'/movie', {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
     },
     body: JSON.stringify({
          name    : __name,
          rating  : __rating,
          duration: __duration,
     }),
     }).then((response) => response.json())
    .then((responseJson) => {
     if(responseJson === 1){
       dispatch(addMovie(responseJson))
       getMovies();
       setError("");
       setSearch("");
     }else{
      setError(responseJson.name[0]);
     }
     
         

    })
    .catch((error) => {
          console.log(error);
    });
    } catch (error) {
       console.log(error);
    }     
 }

   const debounceSearch = (event) => {
     var debounce = false;
      clearTimeout(debounce)
      debounce = setTimeout(() => {
           getMovies(event);
      }, 600)
    }

 useEffect(() => {
   getMovies();
  //  console.log(process.env.REACT_APP_API_URL);
 }, [])

  return (
   
     <Container>
       <Form >
        <Row>
          <Col>
            <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
              <Form.Label>Movie</Form.Label>
              <Form.Control type="text" 
              value={__name}
              onChange={(e) => setName(e.target.value)}
               style={{
                borderColor: error
                    ? 'red'
                    : '#ced4da',
                borderWidth: 1,
            }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
             <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Rating</Form.Label>
                <Form.Control type="number"
                value={__rating}
                onChange={(e) => setRating(e.target.value)}
                 />
              </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
             <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                value={__duration}
                onChange={(e) => setDuration(e.target.value)}
                />
              </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
     
          <Button variant="primary" onClick={() => addMovies()}  >Submit</Button>{' '}
          </Col>
        </Row>

        <Row>
          <Col>
             <Form.Group className="mb-3 mt-4" controlId="formBasicPassword">
                <Form.Label>Search</Form.Label>
                <Form.Control type="text" 
                value={search}
                onChange={(e) => {setSearch(e.target.value);  debounceSearch(e.target.value)}} />
                
              </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Movie</th>
                <th>Rating</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
                {
                    movieList.map((list) => {
                    return (
                     <tr key={list.id}>
                       <td>{list.name}</td>
                       <td>{list.rating}</td>
                       <td>{list.duration}</td>
                     </tr>
                    );
                  })
                }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
    
  );
}

export default App;
