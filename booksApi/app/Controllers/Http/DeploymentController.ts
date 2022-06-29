import Database from '@ioc:Adonis/Lucid/Database'
import Application from '@ioc:Adonis/Core/Application'
import Migrator from '@ioc:Adonis/Lucid/Migrator'
import { QueryClientContract } from '@ioc:Adonis/Lucid/Database'
import AdminUser from 'Database/seeders/AdminUser'
import {SeederConstructorContract} from "@ioc:Adonis/Lucid/Seeder";

export default class DeploymentController {
  public async migrate() {
    const migrator = new Migrator(Database, Application, {
      direction: 'up',
      dryRun: false,
    })

    await migrator.run()
    return migrator.migratedFiles
  }

  public async migrateList() {
    const migrator = new Migrator(Database, Application, {
      direction: 'up',
      dryRun: false,
    })
    return await migrator.getList()
  }

  public async seed() {
    const { exec } = require('node:child_process');

    exec('node ace db:seed');

    return
  }
}
