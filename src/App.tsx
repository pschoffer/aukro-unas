import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, FirebaseAppProvider, FirestoreProvider } from 'reactfire';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { ToastContainer } from 'react-toastify';
import { firebaseConfig } from '@/utils/firebaseConfig';
import { PrivateRoute } from '@/components/PrivateRoute';
import { DashboardPage } from '@/pages/DashboardPage';
import config from '@/utils/config';

import '@/styles/base.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

if (config.useEmulators) {
    connectFirestoreEmulator(firestore, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099');
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 2,
        },
    },
});

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRoute>
                <DashboardPage />
            </PrivateRoute>
        ),
    },
]);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <FirebaseAppProvider firebaseConfig={firebaseConfig}>
                <AuthProvider sdk={auth}>
                    <FirestoreProvider sdk={firestore}>
                        <RouterProvider router={router} />
                        <ToastContainer />
                    </FirestoreProvider>
                </AuthProvider>
            </FirebaseAppProvider>
        </QueryClientProvider>
    );
}

export default App;
