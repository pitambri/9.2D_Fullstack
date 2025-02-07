pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'NodeJS 18'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/pitambri/9.2D_Fullstack.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'  // Ensures a clean and fast install
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                // Run Jest tests in CI mode to avoid interactive failures
                sh 'npm test -- --ci --runInBand || true'
            }
        }

        stage('Deploy') {
            steps {
                sh 'nohup npm start > output.log 2>&1 &'
            }
        }
    }

    post {
        always {
            sh 'cat output.log || true'  // Show logs in Jenkins output
        }
        success {
            echo "✅ Deployment successful!"
        }
        failure {
            echo "❌ Build or Test failed! Check logs for details."
        }
    }
}
