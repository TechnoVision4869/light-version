pipeline {
    agent any
    
    // 1. LIMIT HISTORY: Keeps only the last 5 build logs/metadata
    options {
        buildDiscarder(logRotator(numToKeepStr: '2'))
    }

    environment {
        SSH_ID = 'vps-ssh-key' 
        VPS_IP = '76.13.56.82'
        FRONTEND_DIR = '/home/realestate-frontend'
        BACKEND_DIR = '/home/realestate-app'
    }

    stages {
        stage('Deploy Frontend') {
            steps {
                sshagent([SSH_ID]) {
                    sh """
                    ssh -o StrictHostKeyChecking=no root@${VPS_IP} << 'EOF'
                    # 1. Update the code
                    cd ${FRONTEND_DIR} || exit
                    git fetch origin
                    git reset --hard origin/main

                    # 2. Rebuild the frontend
                    # Ensure you are in the directory where your docker-compose.yml lives
                    cd ${BACKEND_DIR}
                    docker compose up -d --build frontend
                    
                    # 3. Cleanup VPS Disk (Clears the 15.8GB Cache)
                    docker image prune -f
                    docker builder prune -f
EOF
                    """
                }
            }
        }
    }

    // 2. WIPE WORKSPACE: Deletes node_modules/code from the Jenkins volume
    post {
        always {
            cleanWs()
            echo 'Cleanup: Jenkins workspace cleared.'
        }
    }
}
