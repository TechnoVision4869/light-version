pipeline {
    agent any
    environment {
        SSH_ID = 'vps-ssh-key' 
        VPS_IP = '76.13.56.82'
        FRONTEND_DIR = '/home/realestate-frontend'
        BACKEND_DIR = '/home/realestate-app' // This is where docker-compose.yml lives
    }
    stages {
        stage('Deploy Frontend') {
            steps {
                sshagent([SSH_ID]) {
                    sh """
                    ssh -o StrictHostKeyChecking=no root@${VPS_IP} << 'EOF'
                    # 1. Update the code in the frontend directory
                    cd ${FRONTEND_DIR} || exit
                    git fetch origin
                    git reset --hard origin/main

                    # 2. Rebuild the frontend using the shared docker-compose file
                    cd ${BACKEND_DIR}
                    docker compose up -d --build frontend
                    
                    # 3. Cleanup old images
                    docker image prune -f
EOF
                    """
                }
            }
        }
    }
}
