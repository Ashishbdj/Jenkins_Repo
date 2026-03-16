pipeline {

 agent any

 environment {
 AWS_REGION = 'us-east-1'
 ACCOUNT_ID = '453865112565'
 ECR_BACKEND = "453865112565.dkr.ecr.us-east-1.amazonaws.com/taskbackend"
 ECR_FRONTEND = "453865112565.dkr.ecr.us-east-1.amazonaws.com/notesfrontend"
 CLUSTER = "jenkins"
 BACKEND_SERVICE = "NotesBackend-service-glblzvyw"
 FRONTEND_SERVICE = "NotesFrontend-service-4tjw805a"
 }

 stages {

 stage('Clone Repo') {
 steps {
 git 'https://github.com/Ashishbdj/Jenkins_Repo.git'
 }
 }

 stage('Build Backend Image') {
 steps {
 sh 'docker build -t noteapp-backend ./backend'
 }
 }

 stage('Build Frontend Image') {
 steps {
 sh 'docker build -t noteapp-frontend ./my-react-app'
 }
 }

 stage('Login to ECR') {
 steps {
 sh '''
 aws ecr get-login-password --region $AWS_REGION \
 | docker login \
 --username AWS \
 --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
 '''
 }
 }

 stage('Tag Images') {
 steps {
 sh '''
 docker tag noteapp-backend:latest $ECR_BACKEND:latest
 docker tag noteapp-frontend:latest $ECR_FRONTEND:latest
 '''
 }
 }

 stage('Push to ECR') {
 steps {
 sh '''
 docker push $ECR_BACKEND:latest
 docker push $ECR_FRONTEND:latest
 '''
 }
 }

 stage('Deploy to ECS') {
 steps {
 sh '''
 aws ecs update-service \
 --cluster $CLUSTER \
 --service $BACKEND_SERVICE \
 --force-new-deployment

 aws ecs update-service \
 --cluster $CLUSTER \
 --service $FRONTEND_SERVICE \
 --force-new-deployment
 '''
 }
 }

 }

}
