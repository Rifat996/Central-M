import React , { useRef, useState }from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } =  useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()
  

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
      
        const predeterminedEmail = "admin@example.com";
        const predeterminedPassword = "password123";
      
        if (emailRef.current.value !== predeterminedEmail || passwordRef.current.value !== predeterminedPassword) {
          setError("Invalid email or password");
          setLoading(false);
          return;
        }
      
        try {
          await login(emailRef.current.value, passwordRef.current.value);
          navigate("/administratordashboard");
        } catch {
          setError("Failed to log in");
        }
      
        setLoading(false);
      }
      
    return (
    <>

        <style>{`
          body {
            font-family: 'Roboto Slab', serif;
            background-color: #b0b3b750;
          }
        `}</style>

    <Card style={{maxWidth: "400px", margin: "0 auto"}}>
        <Card.Body>
            <h2 className='text-center mb-4'>PRIJAVI SE KAO ADMINISTRATOR</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type='email' ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Lozinka: </Form.Label>
                    <Form.Control type='password' ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className='w-100 mt-4' type='submit'>Prijavi se</Button>
            </Form>
            <div className='w-100 text-center mt-3'>
                <Link to="/login">Nazad na početnu</Link>
            </div>
        </Card.Body>
    </Card>
    </>
  )
}
