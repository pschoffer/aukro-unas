import { useState } from 'react';
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAuth } from 'reactfire';
import { signInWithCustomToken } from 'firebase/auth';
import { toast } from 'react-toastify';
import { aukroLogin } from '@/utils/api';

interface LoginForm {
    username: string;
    password: string;
}

export const LoginPage = () => {
    const auth = useAuth();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

    const onSubmit = async (data: LoginForm) => {
        setLoading(true);
        try {
            const result = await aukroLogin(data.username, data.password);
            await signInWithCustomToken(auth, result.firebaseToken);
        } catch (err: any) {
            const msg: string = err?.message || '';
            if (msg.includes('client:')) {
                toast.error(msg.replace('client:', '').trim());
            } else {
                toast.error('Invalid Aukro credentials. Please check your username and password.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '100%', maxWidth: 400 }}>
                <Card.Body className="p-4">
                    <h4 className="mb-4 text-center">Aukro–Unas Integration</h4>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Aukro username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="username"
                                isInvalid={!!errors.username}
                                {...register('username', { required: 'Username is required' })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Aukro password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                isInvalid={!!errors.password}
                                {...register('password', { required: 'Password is required' })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                            {loading ? <Spinner size="sm" /> : 'Sign in with Aukro'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};
