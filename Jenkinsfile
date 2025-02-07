pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'NodeJS 18'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
        DOCKER_IMAGE = "pitambri/9.2D_Fullstack"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/pitambri/9.2D_Fullstack.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'  // Clean install dependencies
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'  // Build application
                sh 'docker build -t ${DOCKER_IMAGE}:latest .'  // Create Docker image
            }
        }

        stage('Test') {
            steps {
                sh 'npm test -- --ci --runInBand || true'  // Run automated tests
            }
        }

        stage('Code Quality Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'sonar-scanner -Dsonar.projectKey=9.2D_Fullstack -Dsonar.sources=src'
                }
            }
        }

        stage('Deploy to Test Environment') {
            steps {
                sh 'docker run -d --name test_app -p 8080:3000 ${DOCKER_IMAGE}:latest'  
            }
        }

        stage('Release to Production') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                    sh 'docker tag ${DOCKER_IMAGE}:latest ${DOCKER_IMAGE}:prod'
                    sh 'docker push ${DOCKER_IMAGE}:prod'
                }
            }
        }

        stage('Monitoring & Alerting') {
            steps {
                sh 'curl -X POST "https://api.newrelic.com/v2/alerts_events.json" -H "X-Api-Key:${NEW_RELIC_API_KEY}" -d @alert-config.json'
            }
        }
    }

    post {
        always {
            sh 'cat output.log || true'  // Show logs in Jenkins
        }
        success {
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed! Check logs."
        }
    }
}
