import type { FC, ReactNode } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useSigninCheck } from 'reactfire';
import { LoginPage } from '@/pages/LoginPage';

interface IProps {
    children: ReactNode;
}

export const PrivateRoute: FC<IProps> = ({ children }) => {
    const { status, data: signInCheckResult } = useSigninCheck();

    if (status === 'loading') {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Spinner />
            </div>
        );
    }

    if (!signInCheckResult?.signedIn) {
        return <LoginPage />;
    }

    return <Container className="pt-4">{children}</Container>;
};
