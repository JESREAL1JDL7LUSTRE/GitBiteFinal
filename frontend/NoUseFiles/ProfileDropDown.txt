import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const ProfileDropDown = () => {
  return (
      <DropdownMenu>
        <DropdownMenuTrigger></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>View Profile</DropdownMenuItem>
          <DropdownMenuItem>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

  )
}

export default ProfileDropDown
