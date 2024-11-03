import CarList from './components/CarList'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { QueryClient,  QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (

    <QueryClientProvider client={queryClient}>
    <Container maxWidth="xl">
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Carshop
          </Typography>  
        </Toolbar>
      </AppBar>
    <CarList />
    </Container>
    </QueryClientProvider>
  ) 
}

export default App
