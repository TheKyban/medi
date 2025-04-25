# Medi - AI-Powered Medical Diagnosis Platform

Medi is a secure medical diagnosis platform that leverages AI and blockchain technology to provide reliable medical diagnoses while ensuring data privacy and security.

## Tech Stack

- **Frontend**: Next.js, TailwindCSS, shadcn UI
- **Backend**: Node.js (Express), MongoDB for data storage
- **AI Engine**: PyTorch/TensorFlow integrated via FastAPI
- **Blockchain**: Ethereum/Polygon with ethers.js and Solidity smart contracts
- **Authentication**: Credential-based authentication
- **AI Explainability**: Grad-CAM (images), Attention weights (NLP)

## Features

- **Patient Dashboard**:
  - Upload symptoms via form
  - Upload medical files/images
  - View AI diagnosis reports with visual explanations
  - Share diagnoses with verified doctors

- **Doctor Dashboard**:
  - View pending diagnosis requests
  - View AI-generated results and patient data
  - Add medical opinions and validate or reject AI decisions
  - Provide feedback that gets recorded on the blockchain

- **Blockchain Integration**:
  - Secure and immutable record of diagnoses and doctor feedback
  - Patient control over medical data access
  - Transparent audit trail of data access
  - Verification of AI models used for diagnosis

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/medi.git
   cd medi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The frontend can be easily deployed on Vercel:

```bash
npm run build
```

## Development Roadmap

### Phase 1: Core AI System
- Pick diagnosis domain (e.g., chest X-rays, symptom checker)
- Fine-tune a model using public datasets
- Wrap with FastAPI to serve via REST API

### Phase 2: Frontend UI
- Build dashboard pages for patient and doctor interfaces
- Implement file upload and diagnosis display

### Phase 3: Smart Contract
- Create contracts for identity, access control, and audit logs
- Deploy on Polygon testnet

### Phase 4: Storage & Security
- Implement secure medical file storage
- Encrypt data client-side before upload

### Phase 5: Integration & Testing
- End-to-end testing of the full diagnosis workflow
- Security audits and HIPAA compliance checks

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Various open medical datasets used for AI model training
- shadcn UI for the beautiful component library
