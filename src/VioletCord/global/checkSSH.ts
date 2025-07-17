import Bot from "../../utils/Bot.js";

export async function checkSSH(client:Bot): Promise<boolean> {
    if (!client.ssh_client) {
        client.logger.error("SSH server not found in bot body")
        return false
    }
    await client.ssh_client.checkAlive()
    if (!client.ssh_client.connectionAlive) {
        client.logger.error("SSH server connection crash")
        return false
    }
    client.logger.debug("SSH connect check sucessful")
    return true
}