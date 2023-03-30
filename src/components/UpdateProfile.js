import React , { useRef, useState }from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, emailChange, passwordChange } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()
  

   function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")
        if (emailRef.current.value !== currentUser.email) {
            promises.push(emailChange(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(passwordChange(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            navigate('/')
        }).catch(() => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false)
        })

    
       
    }
    return (
    <>

    <style>{`
    body {
        background-color: #b0b3b750;
        font-family: 'Roboto Slab', serif;
    }
    `}</style>

    <Card style={{margin: "0 auto", maxWidth: "400px"}}>
        <Card.Body>
            <h2 className='text-center mb-4'>Ažuriraj Profil</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type='email' ref={emailRef} required defaultValue={currentUser.email} />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Nova lozinka: </Form.Label>
                    <Form.Control type='password' ref={passwordRef} placeholder='Ostavite prazno da zadržite isto' />
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Potvrdi lozinku: </Form.Label>
                    <Form.Control type='password' ref={passwordConfirmRef}  placeholder='Ostavite prazno da zadržite isto' />
                </Form.Group>
                <Button disabled={loading} className='w-100 mt-4' type='submit'>Ažuriraj</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        <Link to="/">Otkaži</Link> 
    </div>
      
    </>
  )
}
