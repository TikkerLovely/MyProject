# Cloud Resume Challenge - AWS Learning Path

This is my learning journey through the **Cloud Resume Challenge** using AWS services. The goal is to build a fully functional, cloud-hosted resume while learning AWS fundamentals step-by-step.

> A place to train and develop my skills in cloud infrastructure, allowing me the freedom to work from anywhere and make better use of my abilities.

## 📋 Project Overview

I will build a cloud-hosted resume with:
- **Static Website Hosting** (S3)
- **Content Delivery** (CloudFront CDN)
- **Visitor Counter** (DynamoDB + Lambda)
- **Infrastructure as Code** (CloudFormation)
- **CI/CD Pipeline** (GitHub Actions)

## 🎯 Learning Objectives

By completing this challenge, I will learn:
- AWS S3 for static website hosting
- CloudFront for CDN and HTTPS
- Lambda for serverless computing
- DynamoDB for NoSQL database
- API Gateway for REST APIs
- CloudFormation for Infrastructure as Code
- GitHub Actions for CI/CD automation
- AWS IAM for security and permissions
- Best practices for cloud architecture

## 📁 Project Structure

```
MyProject/
├── README.md                    # Overview and learning path
├── 01-prerequisites.md          # Step 1: AWS setup & tools
├── 02-html-css-resume.md        # Step 2: Create resume website
├── 03-s3-static-hosting.md      # Step 3: Deploy to S3
├── 04-cloudfront-https.md       # Step 4: CloudFront & HTTPS
├── 05-visitor-counter.md        # Step 5: Lambda + DynamoDB
├── 06-iac-cloudformation.md     # Step 6: Infrastructure as Code
├── 07-cicd-pipeline.md          # Step 7: GitHub Actions CI/CD
├── 08-custom-domain.md          # Step 8: Custom domain setup
│
├── src/                         # Resume website files
│   ├── index.html               # Resume HTML
│   ├── styles.css               # Resume styling
│   └── counter.js               # Visitor counter script
│
├── lambda/                      # Serverless functions
│   ├── visitor-counter/
│   │   ├── handler.py           # Lambda handler
│   │   └── requirements.txt      # Dependencies
│   └── tests/                   # Unit tests
│
├── infrastructure/              # IaC files
│   ├── template.yaml            # CloudFormation template
│   ├── parameters.json          # Stack parameters
│   └── deploy.sh                # Deployment script
│
└── .github/
    └── workflows/
        └── deploy.yml           # GitHub Actions automation
```

## 🚀 Getting Started

Complete these steps in order:

1. **[Step 1: Prerequisites & Setup](./01-prerequisites.md)**
   - AWS account creation
   - Install AWS CLI and necessary tools
   - Configure AWS credentials

2. **[Step 2: Create HTML/CSS Resume](./02-html-css-resume.md)**
   - Design and build resume website
   - CSS styling and responsive design

3. **[Step 3: Deploy to S3](./03-s3-static-hosting.md)**
   - Create S3 bucket
   - Upload website files
   - Enable static website hosting

4. **[Step 4: CloudFront & HTTPS](./04-cloudfront-https.md)**
   - Setup CloudFront distribution
   - Obtain SSL certificate from ACM
   - Configure custom domain

5. **[Step 5: Visitor Counter](./05-visitor-counter.md)**
   - Create DynamoDB table
   - Write Lambda function
   - Setup API Gateway

6. **[Step 6: Infrastructure as Code](./06-iac-cloudformation.md)**
   - Write CloudFormation template
   - Automate resource creation
   - Learn IaC best practices

7. **[Step 7: CI/CD Pipeline](./07-cicd-pipeline.md)**
   - Setup GitHub Actions
   - Automate S3 deployments
   - Run automated tests

8. **[Step 8: Custom Domain](./08-custom-domain.md)**
   - Register or transfer domain
   - Configure Route53
   - Setup email forwarding

## 💡 Learning Tips

- ✅ Complete each step in order
- 📖 Read explanations to understand the "why"
- 🔬 Experiment with AWS console before automating
- 📝 Document your learnings
- 💰 Monitor AWS costs during learning
- 🗑️ Clean up resources to avoid unexpected bills

## 📚 Helpful Resources

- [AWS Cloud Resume Challenge](https://cloudresumechallenge.dev/) - Official challenge
- [AWS Documentation](https://docs.aws.amazon.com/) - Official docs
- [AWS Free Tier](https://aws.amazon.com/free/) - Free usage limits
- [AWS Pricing Calculator](https://calculator.aws/)

## 💰 Cost Estimates

With AWS Free Tier (assuming free tier usage):
- **S3**: ~$0/month
- **CloudFront**: ~$0/month
- **Lambda**: ~$0/month (1M requests free)
- **DynamoDB**: ~$0/month
- **Total**: ~$0/month (with free tier)

⚠️ **Always monitor your billing dashboard!**

## 🎓 Progress Tracking

- [ ] Step 1: Prerequisites complete
- [ ] Step 2: Resume website built
- [ ] Step 3: Deployed to S3
- [ ] Step 4: CloudFront + HTTPS working
- [ ] Step 5: Visitor counter functional
- [ ] Step 6: CloudFormation template created
- [ ] Step 7: CI/CD pipeline automated
- [ ] Step 8: Custom domain configured

---

## 📖 Documentation Index

### 🎨 Design & Portfolio
- **[DESIGN-OVERVIEW.md](./DESIGN-OVERVIEW.md)** - Complete design overview and features
- **[PORTFOLIO-GUIDE.md](./PORTFOLIO-GUIDE.md)** - Detailed customization guide
- **[QUICK-START.md](./QUICK-START.md)** - Quick setup and viewing instructions ⭐ **Start Here!**

### 🎓 Step-by-Step Tutorials (AWS Learning Path)
1. **[01-prerequisites.md](./01-prerequisites.md)** - AWS setup & tools
2. **[02-html-css-resume.md](./02-html-css-resume.md)** - Create portfolio website ✓ Complete
3. **[03-s3-static-hosting.md](./03-s3-static-hosting.md)** - Deploy to AWS S3
4. **[04-cloudfront-https.md](./04-cloudfront-https.md)** - CloudFront & HTTPS
5. **[05-visitor-counter.md](./05-visitor-counter.md)** - Lambda + DynamoDB
6. **[06-iac-cloudformation.md](./06-iac-cloudformation.md)** - Infrastructure as Code (Coming Soon)
7. **[07-cicd-pipeline.md](./07-cicd-pipeline.md)** - GitHub Actions CI/CD (Coming Soon)
8. **[08-custom-domain.md](./08-custom-domain.md)** - Custom domain setup (Coming Soon)

### 🎯 Quick Navigation

**I want to:**
- 🚀 **See it locally right now** → [QUICK-START.md](./QUICK-START.md)
- 🎨 **Customize the design** → [PORTFOLIO-GUIDE.md](./PORTFOLIO-GUIDE.md)
- 📚 **Learn about the design** → [DESIGN-OVERVIEW.md](./DESIGN-OVERVIEW.md)
- ☁️ **Deploy to AWS** → [03-s3-static-hosting.md](./03-s3-static-hosting.md)
- 🔒 **Add HTTPS & custom domain** → [04-cloudfront-https.md](./04-cloudfront-https.md)
- 📊 **Add visitor counter** → [05-visitor-counter.md](./05-visitor-counter.md)
- 🛠️ **Learn AWS basics** → [01-prerequisites.md](./01-prerequisites.md)

---

## 🚀 Getting Started (Choose Your Path)

### Path 1: View Locally First (5 minutes)
1. Open [QUICK-START.md](./QUICK-START.md)
2. Run Python server
3. Customize your information
4. See it in browser immediately

### Path 2: Learn Everything (2-4 weeks)
1. Start with [01-prerequisites.md](./01-prerequisites.md)
2. Complete each step in order
3. Learn AWS while building
4. Deploy fully functional site

### Path 3: Just Customize It (30 minutes)
1. Read [QUICK-START.md](./QUICK-START.md)
2. Edit `src/index.html` with your info
3. Edit `src/styles.css` colors
4. Deploy with commands provided

---

## 📁 File Structure

```
MyProject/
├── 📖 README.md                      ← You are here
├── 🚀 QUICK-START.md                ← Start here!
├── 🎨 DESIGN-OVERVIEW.md            
├── 📚 PORTFOLIO-GUIDE.md            
├── 📖 01-prerequisites.md           
├── 📖 02-html-css-resume.md        
├── 📖 03-s3-static-hosting.md      
├── 📖 04-cloudfront-https.md       
├── 📖 05-visitor-counter.md        
│
└── src/                              ← Your website
    ├── index.html                    ← Portfolio page
    ├── styles.css                    ← Modern styling
    └── counter.js                    ← Visitor counter
```

---

**Start Learning**: [Go to QUICK-START →](./QUICK-START.md)
