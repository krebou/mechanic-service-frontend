import { NgModule } from '@angular/core';
import { GenderPipe } from './gender.pipe';
import { EngineTypePipe } from './engine-type.pipe';
import { RepairTypesPipe } from './repair/repair-types.pipe';
import { RepairStatusPipe } from './repair/repair-status.pipe';
import { PriceFormatPipe } from './price-format.pipe';
import { UserStatusPipe } from './user-status.pipe';
import { UserRolePipe } from './user-role.pipe';

const PIPES = [
    GenderPipe,
    EngineTypePipe,
    RepairTypesPipe,
    RepairStatusPipe,
    PriceFormatPipe,
    UserStatusPipe,
    UserRolePipe,
];

@NgModule({
    declarations: PIPES,
    exports: PIPES,
})
export class PipesModule {}
