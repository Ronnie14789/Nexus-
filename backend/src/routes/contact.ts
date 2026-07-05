import { Router } from 'express';
import { body } from 'express-validator';
import { contactLimiter } from '../middleware/rateLimiter';
import { authenticate } from '../middleware/auth';
import { submitContact, listContacts, updateContactStatus } from '../controllers/contactController';

const router = Router();

const enquiryTypes = [
  'Professional collaboration',
  'Automotive technical support',
  'Electrical systems',
  'Website or digital project',
  'Recruitment opportunity',
  'General enquiry',
];

const contactValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email').trim().isEmail().isLength({ max: 160 }).normalizeEmail().withMessage('A valid email is required'),
  body('phone')
    .optional({ values: 'falsy' })
    .trim()
    .matches(/^[+()\d\s-]{7,30}$/)
    .withMessage('Please enter a valid phone number'),
  body('enquiryType').isIn(enquiryTypes).withMessage('Please select a valid enquiry type'),
  body('subject').trim().isLength({ min: 5, max: 200 }).withMessage('Subject must be 5-200 characters'),
  body('message').trim().isLength({ min: 20, max: 5000 }).withMessage('Message must be 20-5000 characters'),
  body('consent').custom((value) => value === true).withMessage('Consent is required so I can reply'),
  body('companyWebsite').optional().isString().isLength({ max: 200 }),
  body('startedAt').isInt({ min: 1 }).toInt().withMessage('Invalid form timing data'),
];

router.post('/', contactLimiter, contactValidation, submitContact);
router.get('/', authenticate, listContacts);
router.patch('/:id/status', authenticate, updateContactStatus);

export default router;
