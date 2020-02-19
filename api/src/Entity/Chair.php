<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\ChairRepository")
 */
class Chair
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\RTable", inversedBy="chairs")
     */
    private $rtable;

    /**
     * @ORM\Column(type="string", length=16)
     */
    private $mac_address;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRtable(): ?RTable
    {
        return $this->rtable;
    }

    public function setRtable(?RTable $rtable): self
    {
        $this->rtable = $rtable;

        return $this;
    }

    public function getMacAddress(): ?string
    {
        return $this->mac_address;
    }

    public function setMacAddress(string $mac_address): self
    {
        $this->mac_address = $mac_address;

        return $this;
    }
}
