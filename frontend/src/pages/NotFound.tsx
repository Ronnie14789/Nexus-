import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/Icon';

export default function NotFound() {
  return (
    <main className="not-found">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p>404 · Route not found</p>
        <h1>This road does not lead to a project.</h1>
        <span>The page may have moved, or the address may be incomplete.</span>
        <Link className="button button-primary" to="/">
          Return home <Icon name="arrow" />
        </Link>
      </motion.div>
    </main>
  );
}
