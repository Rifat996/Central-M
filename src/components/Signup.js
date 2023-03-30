import React , { useRef, useState }from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } =  useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()
  

   async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

try {
    setError("")
    setLoading(true)
   await signup(emailRef.current.value, passwordRef.current.value)
   navigate('/')
    } catch {
    setError("Failed to create an account")
    }

       setLoading(false) 
    }
    return (
    <>

        <style>{`
          body {
            font-family: 'Roboto Slab', serif;
            background-color: #b0b3b750;
          }
        `}</style>

    <Card style={{margin: "0 auto", maxWidth: "400px"}}>
        <Card.Body>
            <h2 className='text-center mb-4'>Registracija</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type='email' ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Lozinka:</Form.Label>
                    <Form.Control type='password' ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Potvrdi lozinku:</Form.Label>
                    <Form.Control type='password' ref={passwordConfirmRef} required />
                </Form.Group>
                <Button disabled={loading} className='w-100 mt-4' type='submit'>REGISTRIRAJ SE</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        Već imate račun? <Link to="/login">Nazad na prijavu</Link> 
    </div>
      
    </>
  )
}
